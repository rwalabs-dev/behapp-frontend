export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
            {children}
        </div>
    )
}

function CardTitle({ children }: { children: string }) {
    return (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {children}
        </h5>
    )
}

Card.Title = CardTitle
