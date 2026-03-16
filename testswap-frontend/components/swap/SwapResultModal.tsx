"use client"

export default function SwapResultModal({ success, close }: { success: boolean,close: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="dex-card p-6 w-[320px] text-center">
                {success ? (
                    <>
                        <h2 className="text-xl font-bold text-green-400">Swap Successful</h2>
                        <p className="text-white/60 mt-2">Your transaction was completed.</p>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-red-400">Swap Failed</h2>
                        <p className="text-white/60 mt-2">Transaction Failed.</p>
                    </>
                )}
                <button onClick={close} className="dex-button w-full mt-4">
                    Close
                </button>
            </div>
        </div>
    )
}