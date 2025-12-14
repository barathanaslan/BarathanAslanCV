function exportPDF() {
    // get the content
    const content = document.querySelector('.cv-content').innerHTML;

    // create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // write content to iframe
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title> </title>
            <link rel="stylesheet" href="style.css">
            <style>
                /* Hide browser headers/footers */
                @page { margin: 0; size: auto; }
                
                body { 
                    background: white; 
                    margin: 0; 
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    -webkit-print-color-adjust: exact;
                }

                /* Wrapper to ensure reliable margins + scaling */
                .print-wrapper {
                    padding: 40px 50px; /* Top/Bottom: 40px, Left/Right: 50px */
                    width: 100%;
                    box-sizing: border-box;
                    
                    /* Optional: Scale down slightly if "zoomed in too much" */
                    transform: scale(0.95);
                    transform-origin: top center;
                }

                /* Override CV content styles */
                .cv-content {
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                    overflow: visible !important;
                    display: block !important; 
                }

                a { color: black; text-decoration: none; }
                ::-webkit-scrollbar { display: none; }
            </style>
        </head>
        <body>
            <div class="print-wrapper">
                <div class="cv-content">
                    ${content}
                </div>
            </div>
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500); 
                };
            </script>
        </body>
        </html>
    `);
    doc.close();

    // Remove iframe after sufficient time for user to interact with print dialog
    // Note: The print dialog blocks JS execution in many browsers, so this runs after close.
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 2000);
}
