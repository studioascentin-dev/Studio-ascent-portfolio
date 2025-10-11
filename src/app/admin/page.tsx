
'use client';

import withAuth from '@/components/auth/with-auth';
import { useMemo, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Loader2, Search } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase/provider';

type Contact = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number };
};

type SupportRequest = {
  id: string;
  name: string;
  email:string;
  whatsapp?: string;
  paymentId: string;
  productName: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number };
};

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const firestore = useFirestore();
  const auth = useAuth();

  const contactsQuery = useMemoFirebase(() => query(collection(firestore, 'contacts'), orderBy('createdAt', 'desc')), [firestore]);
  const supportQuery = useMemoFirebase(() => query(collection(firestore, 'supportRequests'), orderBy('createdAt', 'desc')), [firestore]);
  
  const { data: contacts, isLoading: isLoadingContacts } = useCollection<Contact>(contactsQuery);
  const { data: supportRequests, isLoading: isLoadingSupport } = useCollection<SupportRequest>(supportQuery);

  const filteredContacts = useMemo(() => {
    return contacts?.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  const filteredSupportRequests = useMemo(() => {
    return supportRequests?.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [supportRequests, searchTerm]);

  const isLoading = isLoadingContacts || isLoadingSupport;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Admin Dashboard</h1>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-12">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContacts && filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell>
                                {contact.createdAt ? format(new Date(contact.createdAt.seconds * 1000), 'PPp') : 'N/A'}
                              </TableCell>
                              <TableCell>{contact.name}</TableCell>
                              <TableCell>{contact.email}</TableCell>
                              <TableCell>{contact.service}</TableCell>
                              <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              No contact submissions found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Support Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSupportRequests && filteredSupportRequests.length > 0 ? (
                          filteredSupportRequests.map((req) => (
                            <TableRow key={req.id}>
                               <TableCell>
                                {req.createdAt ? format(new Date(req.createdAt.seconds * 1000), 'PPp') : 'N/A'}
                              </TableCell>
                              <TableCell>{req.name}</TableCell>
                              <TableCell>{req.email}</TableCell>
                              <TableCell>{req.productName}</TableCell>
                              <TableCell>{req.paymentId}</TableCell>
                              <TableCell className="max-w-xs truncate">{req.message}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center">
                              No support requests found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
               <div className="text-center">
                <Button variant="outline" onClick={() => auth.signOut()}>
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default withAuth(AdminDashboard);
