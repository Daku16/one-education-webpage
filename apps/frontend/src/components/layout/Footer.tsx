import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">About</h3>
                        <p className="text-sm">One Education - Empowering students worldwide.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Courses</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-white">Privacy</a></li>
                            <li><a href="#" className="hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Follow</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-white">Twitter</a></li>
                            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {currentYear} One Education. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};