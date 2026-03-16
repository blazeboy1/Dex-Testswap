"use client"

export default function TokenUpload({setImage}:{setImage:any}) {

    const Upload = (e:any) => {
        const file = e.target.files[0]
        if(!file) return
        const url = URL.createObjectURL(file)
        setImage(url)
    }

    return (

        <div>
            <input type="file" onChange={Upload} className="text-sm text-white/60"/>
        </div>
        
    )
}