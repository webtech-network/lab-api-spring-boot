import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    CATEGORY_LABELS,
    SETUP_CATEGORIES,
    setupStore,
    type Setup,
    type SetupCategory,
} from '@/lib/setup-store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SetupForm({ initial }: { initial?: Setup }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState(initial?.title ?? '');
    const [description, setDescription] = useState(initial?.description ?? '');
    const [category, setCategory] = useState<SetupCategory>(initial?.category ?? 'DEVELOPMENT');
    const [estimatedCost, setEstimatedCost] = useState<string>(
        initial ? String(initial.estimatedCost) : ''
    );
    const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const payload = {
            title: title.trim(),
            description: description.trim(),
            category,
            estimatedCost: Number(estimatedCost) || 0,
            imageUrl:
                imageUrl.trim() ||
                'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=1200',
        };
        if (initial) {
            setupStore.update(initial.id, payload);
            navigate(`/setups/${initial.id}`);
        } else {
            const created = setupStore.create(payload);
            navigate(`/setups/${created.id}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Title" hint="Give your setup a catchy name">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Cyber Dev Cave"
                    required
                    className="h-12 rounded-xl border-border/60 bg-surface text-base"
                />
            </Field>

            <Field label="Description" hint="Tell the story behind your setup">
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ergonomics, lighting, the vibe you were going for..."
                    required
                    rows={5}
                    className="resize-none rounded-xl border-border/60 bg-surface text-base"
                />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
                <Field label="Category">
                    <Select value={category} onValueChange={(v) => setCategory(v as SetupCategory)}>
                        <SelectTrigger className="h-12 rounded-xl border-border/60 bg-surface">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SETUP_CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {CATEGORY_LABELS[c]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                <Field label="Estimated budget (R$)">
                    <Input
                        type="number"
                        min={0}
                        step={50}
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        placeholder="0"
                        required
                        className="h-12 rounded-xl border-border/60 bg-surface text-base"
                    />
                </Field>
            </div>

            <Field label="Image URL" hint="Optional. Paste a link to an image of your setup.">
                <Input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="h-12 rounded-xl border-border/60 bg-surface text-base"
                />
            </Field>

            <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" variant="hero" size="lg">
                    {initial ? 'Save changes' : 'Publish setup'}
                </Button>
                <Button type="button" variant="ghost" size="lg" onClick={() => navigate('/')}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

function Field({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                </label>
                {hint && <span className="text-xs text-muted-foreground/70">{hint}</span>}
            </div>
            {children}
        </div>
    );
}
