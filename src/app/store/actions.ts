
'use server';

import { initializeFirebase } from '@/firebase';
import { doc, runTransaction } from 'firebase/firestore';

// Server action to update the rating
export async function rateProduct(slug: string, rating: number) {
  try {
    const { firestore } = initializeFirebase();
    const productRef = doc(firestore, 'products', slug);

    await runTransaction(firestore, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        // If doc doesn't exist, create it with the first rating
        const newProductData = {
            ratingCount: 1,
            totalStars: rating,
        };
        transaction.set(productRef, newProductData);
      } else {
        // If doc exists, update the rating
        const currentRatingCount = productDoc.data().ratingCount || 0;
        const currentTotalStars = productDoc.data().totalStars || 0;
        const newRatingCount = currentRatingCount + 1;
        const newTotalStars = currentTotalStars + rating;
        transaction.update(productRef, {
            ratingCount: newRatingCount,
            totalStars: newTotalStars
        });
      }
    });
    return { success: true };
  } catch (e: any) {
    console.error('Rating transaction failed:', e);
    return { success: false, error: e.message || 'Could not submit your rating.' };
  }
}
