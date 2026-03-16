export default function PriceInfo({priceImpact}:{priceImpact:number}) {
    return (
        
        <div className="text-sm text-white/60 space-y-1">
            <div className="flex justify-between">
                <span>Price</span>
                <span>1 TOKEN = 0.01 USDC</span>
            </div>

            <div className="flex justify-between">
                <span>Slippage</span>
                <span>0.5%</span>
            </div>

            <div className="flex justify-between">
                <span>Price Impact</span>
                <span>{priceImpact ? priceImpact.toFixed(2) : "0"} %</span>
            </div>

        </div>
    )
}