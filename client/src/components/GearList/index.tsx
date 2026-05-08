import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    formatCurrency,
    GEAR_LABELS,
    GEAR_TYPES,
    setupStore,
    type GearItem,
    type GearType,
} from '@/lib/setup-store';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function GearDialog({
    setupId,
    initial,
    trigger,
}: {
    setupId: string;
    initial?: GearItem;
    trigger: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(initial?.name ?? '');
    const [brand, setBrand] = useState(initial?.brand ?? '');
    const [type, setType] = useState<GearType>(initial?.type ?? 'KEYBOARD');
    const [price, setPrice] = useState<string>(initial ? String(initial.price) : '');

    function reset() {
        if (!initial) {
            setName('');
            setBrand('');
            setType('KEYBOARD');
            setPrice('');
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = {
            name: name.trim(),
            brand: brand.trim(),
            type,
            price: Number(price) || 0,
        };
        if (initial) setupStore.updateGear(setupId, initial.id, data);
        else setupStore.addGear(setupId, data);
        setOpen(false);
        reset();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                if (!v) reset();
            }}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="glass-strong max-w-md rounded-2xl border-border/50">
                <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                        {initial ? 'Edit item' : 'Add gear'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <FormRow label="Name">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g. MX Master 3S"
                            className="h-11 rounded-xl border-border/60 bg-surface"
                        />
                    </FormRow>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormRow label="Brand">
                            <Input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                                placeholder="Logitech"
                                className="h-11 rounded-xl border-border/60 bg-surface"
                            />
                        </FormRow>
                        <FormRow label="Type">
                            <Select value={type} onValueChange={(v) => setType(v as GearType)}>
                                <SelectTrigger className="h-11 rounded-xl border-border/60 bg-surface">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {GEAR_TYPES.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {GEAR_LABELS[t]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormRow>
                    </div>
                    <FormRow label="Price">
                        <Input
                            type="number"
                            min={0}
                            step={10}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="0"
                            className="h-11 rounded-xl border-border/60 bg-surface"
                        />
                    </FormRow>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="hero">
                            {initial ? 'Save' : 'Add'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
            </label>
            {children}
        </div>
    );
}

export function GearList({ setupId, items }: { setupId: string; items: GearItem[] }) {
    if (items.length === 0) return null;

    return (
        <ul className="grid gap-3">
            {items.map((g) => (
                <li
                    key={g.id}
                    className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-surface/60 p-4 transition-smooth hover:border-primary/40 hover:bg-surface"
                >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border/60 bg-surface-elevated">
                        <span className="font-mono text-[10px] font-semibold uppercase text-primary">
                            {g.type.slice(0, 3)}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="truncate font-medium">{g.name}</h4>
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                                {GEAR_LABELS[g.type]}
                            </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{g.brand}</p>
                    </div>
                    <div className="text-right">
                        <div className="font-mono text-sm font-semibold">
                            {formatCurrency(g.price)}
                        </div>
                    </div>
                    <div className="flex shrink-0 gap-1 opacity-0 transition-smooth group-hover:opacity-100">
                        <GearDialog
                            setupId={setupId}
                            initial={g}
                            trigger={
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </Button>
                            }
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setupStore.removeGear(setupId, g.id)}
                        >
                            <X className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function AddGearButton({ setupId }: { setupId: string }) {
    return (
        <GearDialog
            setupId={setupId}
            trigger={
                <Button variant="glass" size="lg" className="rounded-2xl">
                    <Plus className="h-4 w-4" /> Add gear
                </Button>
            }
        />
    );
}

export { Trash2 };
