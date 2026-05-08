import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Search } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SetupForm } from '@/components/SetupForm';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useSetups } from '@/lib/setup-store';

export function EditSetupPage() {
    const { id = '' } = useParams();
    const setups = useSetups();
    const setup = setups.find((s) => s.id === id);

    return (
        <div className="min-h-screen pb-24">
            <Navbar />
            <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
                <Link
                    to={`/setups/${id}`}
                    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-smooth hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" /> Voltar
                </Link>

                {!setup ? (
                    <EmptyState
                        icon={Search}
                        title="Setup não encontrado"
                        description="Não conseguimos encontrar este setup."
                        action={
                            <Button asChild variant="hero">
                                <Link to="/">Ir para galeria</Link>
                            </Button>
                        }
                    />
                ) : (
                    <>
                        <div className="mb-10 flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                                <Pencil className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    Editar setup
                                </div>
                                <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                                    {setup.title}
                                </h1>
                            </div>
                        </div>
                        <div className="glass-strong rounded-3xl p-6 md:p-10">
                            <SetupForm initial={setup} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
