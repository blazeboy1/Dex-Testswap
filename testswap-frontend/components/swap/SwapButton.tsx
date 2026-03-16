"use client"

export default function SwapButton({ loading, onSwap, onSuccess, onFail }: { loading: boolean, onSwap: () => void, onSuccess: () => void, onFail: () => void }) {
    const simulateSwap = () => {
        const success = Math.random() > 0.3
        if (success) {
            onSuccess()
        } else {
            onFail()
        }
    }

    return (
        <button onClick={onSwap} disabled={loading} className="dex-button w-full mt-4">
            {loading ? "Swapping..." : "Swap"}
        </button>
    )
}