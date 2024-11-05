import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

function Layout({
    children,
    title = "TaskFlow",
    author = "Eklavya Gupta",
    description = "Advance Task Manager",
    keywords = [] }) {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="author" content={author} />
                <meta name="keywords" content={keywords} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className="min-h-[82vh]">
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout