
import type { SVGProps } from "react";

export function UserIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={64} cy={64} fill="#ff8475" r={60} opacity={0.3} />
            <circle cx={64} cy={64} fill="#f85565" opacity=".2" r={48} />
            <path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="hsl(var(--primary))" opacity={0.4} />
            <path d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" fill="hsl(var(--primary-foreground))" opacity=".4" />
            <circle cx={89} cy={65} fill="#fbc0aa" r={7} opacity={0.8} />
            <path d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" fill="hsl(var(--accent))" opacity={0.6} />
            <path d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" fill="#fff" opacity={0.8} />
            <path d="m64 88.75v9.75" fill="none" stroke="#fbc0aa" strokeLinecap="round" strokeLinejoin="round" strokeWidth={14} opacity={0.8}/>
            <circle cx={39} cy={65} fill="#fbc0aa" r={7} opacity={0.8}/>
            <path d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" fill="hsl(var(--primary))" opacity={0.6}/>
            <path d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" fill="hsl(var(--primary-foreground))" opacity={0.5}/>
            <circle cx={76} cy="62.28" fill="#515570" r={3} />
            <circle cx={52} cy="62.28" fill="#515570" r={3} />
            <path d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" fill="hsl(var(--destructive))" opacity={0.7} />
        </svg>
    )
}
