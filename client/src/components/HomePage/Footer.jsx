import React from "react";

export default function Footer() {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="footer-title">AI-Elearn</h2>
                    <p>Building the future of online programming education.</p>
                </div>
                <div>
                    <span className="footer-title">Resources</span>
                    <a className="link link-hover block mt-2" href="#">
                        Blog
                    </a>
                    <a className="link link-hover block mt-2" href="#">
                        Docs
                    </a>
                    <a className="link link-hover block mt-2" href="#">
                        Support
                    </a>
                </div>
                <div>
                    <span className="footer-title">Contact</span>
                    <a
                        className="link link-hover block mt-2"
                        href="mailto:email@example.com"
                    >
                        email@example.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
