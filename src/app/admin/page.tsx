
'use client';

import * as React from 'react';
import DataGrid, { textEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { storeItems } from '@/lib/store-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

type StoreCategory = keyof typeof storeItems;

const initialData: Record<StoreCategory, any[]> = {
  plugins: [...storeItems.plugins],
  projectFiles: [...storeItems.projectFiles],
  applications: [...storeItems.applications],
};

const getColumns = (category: StoreCategory) => {
    const commonColumns = [
        { key: 'slug', name: 'Slug', editor: textEditor },
        { key: 'name', name: 'Name', editor: textEditor },
        { key: 'description', name: 'Description', editor: textEditor },
        { key: 'image', name: 'Image Path', editor: textEditor },
        { key: 'dataAiHint', name: 'AI Hint', editor: textEditor },
    ];

    if (category === 'plugins' || category === 'projectFiles') {
        return [
            ...commonColumns,
            { key: 'price', name: 'Price', editor: textEditor },
            { key: 'originalPrice', name: 'Original Price', editor: textEditor },
            { key: 'discount', name: 'Discount', editor: textEditor },
            { key: 'reviews', name: 'Reviews', editor: textEditor },
            { key: 'rating', name: 'Rating', editor: textEditor },
            { key: 'platform', name: 'Platform', editor: textEditor },
            { key: 'installVideo', name: 'Install Video URL', editor: textEditor },
        ];
    }

    return commonColumns;
};


export default function AdminPage() {
    const { toast } = useToast();
    const [rows, setRows] = React.useState(initialData);
    const [activeTab, setActiveTab] = React.useState<StoreCategory>('plugins');

    const handleSave = () => {
        console.log('Saved Data:', rows);
        toast({
            title: 'Data Saved!',
            description: 'Your changes have been saved locally. (No backend integration)',
        });
    };
    
    const handleRowsChange = (category: StoreCategory, updatedRows: any[]) => {
        setRows(prev => ({
            ...prev,
            [category]: updatedRows
        }));
    };

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-28 pb-12">
                <motion.div 
                  className="container mx-auto px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold font-headline">Admin Dashboard</h1>
                        <Button onClick={handleSave} className="font-bold">Save Changes</Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as StoreCategory)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                            <TabsTrigger value="plugins">Plugins</TabsTrigger>
                            <TabsTrigger value="projectFiles">Project Files</TabsTrigger>
                            <TabsTrigger value="applications">Applications</TabsTrigger>
                        </TabsList>
                        
                        {Object.keys(rows).map(key => {
                            const category = key as StoreCategory;
                            return (
                                <TabsContent key={category} value={category}>
                                    <div className="bg-card p-4 rounded-lg border border-border h-[60vh] overflow-auto">
                                      <DataGrid
                                          columns={getColumns(category)}
                                          rows={rows[category]}
                                          onRowsChange={(newRows) => handleRowsChange(category, newRows)}
                                          className="rdg-dark h-full"
                                          rowHeight={45}
                                      />
                                    </div>
                                </TabsContent>
                            )
                           })}
                    </Tabs>
                </motion.div>
            </main>
            <style jsx global>{`
              .rdg-dark {
                --rdg-color: var(--rdg-color, #eee);
                --rdg-background-color: hsl(var(--card));
                --rdg-header-background-color: hsl(var(--secondary));
                --rdg-row-hover-background-color: hsl(var(--secondary) / 0.5);
                --rdg-border-color: hsl(var(--border));
                --rdg-row-selected-background-color: hsl(var(--primary) / 0.2);
                --rdg-checkbox-color: hsl(var(--primary));
                --rdg-selection-color: hsl(var(--primary));
              }
            `}</style>
            <Footer />
        </div>
    );
}