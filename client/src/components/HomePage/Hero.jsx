import React from "react";

const heroContent = {
    title: "Transform Your Learning with AI",
    description:
        "Personalized programming lessons tailored to your pace and goals.",
    buttonText: "Get Started",
};

export default function Hero() {
    return (
        <section className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">{heroContent.title}</h1>
                    <p className="py-6 text-lg opacity-70">
                        {heroContent.description}
                    </p>
                    <a href="#" className="btn btn-primary btn-lg">
                        {heroContent.buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
}
