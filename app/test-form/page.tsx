'use client';

import { useState } from 'react';

export default function TestFormPage() {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>

                {!iframeLoaded && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading form...</p>
                        </div>
                    </div>
                )}

                <iframe
                    src={`https://forms-eu1.hsforms.com/1e420731e6d7a4fd997bc834b09e8c43b`}
                    title="HubSpot Form"
                    width="100%"
                    height="600"
                    className="w-full border-0 rounded-lg"
                    onLoad={() => setIframeLoaded(true)}
                    style={{ display: iframeLoaded ? 'block' : 'none' }}
                />
            </div>
        </div>
    );
}