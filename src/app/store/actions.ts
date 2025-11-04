
'use server';

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';

// Server action to update the rating
export async function rateProduct(slug: string, rating: number) {
  try {
    // Server-side Firebase initialization
    const agetAuthdminApp = !getApps().length
      ? initializeApp({
          credential: credential.applicationDefault(),
        })
      : getApps()[0];

    const firestore = getFirestore(adminApp);
    const productRef = firestore.collection('products').doc(slug);

    await firestore.runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists) {
        const newProductData = {
          ratingCount: 1,
          totalStars: rating,
        };
        transaction.set(productRef, newProductData);
      } else {
        const currentRatingCount = productDoc.data()?.ratingCount || 0;
        const currentTotalStars = productDoc.data()?.totalStars || 0;
        const newRatingCount = currentRatingCount + 1;
        const newTotalStars = currentTotalStars + rating;
        transaction.update(productRef, {
          ratingCount: newRatingCount,
          totalStars: newTotalStars,
        });
      }
    });
    return { success: true };
  } catch (e: any) {
    console.error('Rating transaction failed:', e);
    return { success: false, error: e.message || 'Could not submit your rating.' };
  }
}
