export default function TokenPreview({name, symbol, image}:{name:string, symbol:string, description:string, image:string}) {
    if(!name || !symbol || !image) return null

    return (

        <div className="dex-card p-4 flex items-center gap-4"> {image && (<img src={image} className="w-10 h-10 rounded-full" />)}
            <div>
                <p className="font-semibold">
                    {name || "Token Name"}
                </p>
                <p className="text-sm text-white/60">
                    {symbol || "SYMBOL"}
                </p>
            </div>
        </div>

    )
}