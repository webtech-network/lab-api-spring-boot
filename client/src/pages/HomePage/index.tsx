import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SetupCard } from '@/components/SetupCard';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-setup.jpg';
import { useSetups } from '@/lib/setup-store';

export function HomePage() {
    const setups = useSetups();

    return (
        <div className="min-h-screen">
            <Navbar />

            <section className="relative isolate overflow-hidden">
                <img
                    src={heroImage}
                    alt="Modern setup with ultrawide monitor and ambient lighting"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-110 contrast-110 saturate-125 blur-[1px] md:blur-[2px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-background/45" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-70" />

                <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
                    <div className="mx-auto max-w-3xl space-y-8 rounded-[2rem] border border-border/40 bg-surface/45 p-8 text-center shadow-elegant backdrop-blur-md md:p-12">
                        <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            <span className="block">The setups that</span>
                            <em className="block text-gradient not-italic">shape code.</em>
                        </h1>

                        <p className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg">
                            SetupHub is the definitive gallery of developer, gamer, and creator
                            workspaces. Get inspired, share your setup, and build the workspace of
                            your dreams.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button asChild variant="hero" size="lg">
                                <Link to="/setups/new">
                                    Publish setup <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-primary/60 bg-transparent text-primary hover:border-primary hover:bg-primary/10 hover:text-primary"
                            >
                                <a href="#gallery">Explore gallery</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8" id="gallery">
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Gallery
                        </div>
                        <h2 className="mt-2 font-display text-4xl font-normal tracking-tight md:text-5xl">
                            All setups
                        </h2>
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:block">
                        {setups.length} published
                    </div>
                </div>

                <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {setups.map((s) => (
                        <SetupCard key={s.id} setup={s} />
                    ))}
                </div>
            </section>
        </div>
    );
}
