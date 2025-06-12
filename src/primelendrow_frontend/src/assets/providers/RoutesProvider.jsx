import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SessionProvider } from './SessionProvider'
import NullProvider from './NullProvider'
import AccessProvider from './AccessProvider'
import AdminProvider from './AdminProvider'
import PendingProvider from './PendingProvider'

import Index from '../pages/Index'
import Home from '../pages/Home'
import Pending from '../pages/Pending'

import Admin from '../admin/Admin'
import AdminProfile from '../admin/AdminProfile'
import AdminAccounts from '../admin/AdminAccounts'
import AdminVault from '../admin/AdminVault'
import AdminLenders from '../admin/AdminLenders'
import AdminBorrowers from '../admin/AdminBorrowers'
import AdminPayments from '../admin/AdminPayments'

function RoutesProvider() {
  return (
    <>

         <BrowserRouter>

            <SessionProvider>

                <Routes>
                    
                    <Route path="*" element={<NullProvider />} />
                    <Route path="/" element={<AccessProvider><Index /></AccessProvider>} />
                    <Route path="/index" element={<AccessProvider><Index /></AccessProvider>} />
                    <Route path="/home" element={<AccessProvider><Home /></AccessProvider>} />
                    <Route path="/pending" element={<PendingProvider><Pending /></PendingProvider>} />

                    <Route element={<AdminProvider><Admin /></AdminProvider>} >
                    
                        <Route path="admin-profile" element={<AdminProfile />} />
                        <Route path="admin-accounts" element={<AdminAccounts />} />
                        <Route path="admin-vault" element={<AdminVault />} />
                        <Route path="admin-lenders" element={<AdminLenders />} />
                        <Route path="admin-borrowers" element={<AdminBorrowers />} />
                        <Route path="admin-payments" element={<AdminPayments />} />

                    </Route>

                </Routes>

            </SessionProvider>

        </BrowserRouter>

    </>
  )
}

export default RoutesProvider