import React from "react";

export default function HowItWorks() {
    const steps = [
        { title: "Sign Up", color: "bg-primary text-primary-content" },
        {
            title: "Choose Course",
            color: "bg-secondary text-secondary-content",
        },
        { title: "Learn & Practice", color: "bg-accent text-accent-content" },
        { title: "Track Progress", color: "bg-info text-info-content" },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-base-200 to-base-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-base-content">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`card shadow-xl hover:shadow-2xl transition-shadow duration-300 ${step.color}`}
                        >
                            <div className="card-body items-center text-center">
                                <p className="font-semibold text-lg">
                                    {step.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
