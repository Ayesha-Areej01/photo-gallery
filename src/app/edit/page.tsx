"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldImage } from "next-cloudinary";
import { useState } from "react";


export default function EditPage({
    searchParams: { publicId }, 
}:{
    searchParams: {
        publicId: string;
    };
}) {
    const [transformation, setTransformation] = useState< undefined | "generative-fill" | "blur" | "grayscale"
    | "pixelate" | "tint" | "opacity" | "background-removal"
    >();

    const [pendingPrompt, setPendingPrompt] = useState('');
    const [prompt, setPrompt] = useState('');

    console.log(publicId);
    return (
        <section>
        <div className='flex flex-col gap-8'>
        <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>
        <div className="flex flex-wrap gap-4">
        <Button variant="ghost" onClick={()=>setTransformation(undefined)}>Clear All</Button>
        <div className="flex flex-col gap-4">
        <Button onClick={()=>{setTransformation('generative-fill'); setPrompt(pendingPrompt)}}>Apply Generative Fill</Button>
        <Input value={pendingPrompt} onChange={(e) => setPendingPrompt(e.currentTarget.value)} placeholder="Enter prompt" />
        </div>
        <Button onClick={()=>setTransformation('blur')}>Apply Blur</Button>
        <Button onClick={()=>setTransformation('grayscale')}>Convert to Gray</Button>
        <Button onClick={()=>setTransformation('pixelate')}>Pixelate</Button>
        <Button onClick={()=>setTransformation('tint')}>Apply tint</Button>
        <Button onClick={()=>setTransformation('opacity')}>Opacity</Button>
        <Button onClick={()=>setTransformation('background-removal')}>Remove Background</Button>
        </div>
        <div className="grid grid-cols-2 gap-12">
        <CldImage src={publicId} width={300} height={300} alt="image"
        />
        {transformation === 'generative-fill' &&
        <CldImage src={publicId} width={1800} height={1200} alt="image" crop="pad" fillBackground={{prompt }}
        />
        }
        {transformation === 'blur' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" blur="800"
        />
        }
        {transformation === 'grayscale' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" grayscale
        />
        }
        {transformation === 'pixelate' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" pixelate
        />
        }
        {transformation === 'tint' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" tint="equalize:80:blue:blueviolet"
        />
        }
        {transformation === 'opacity' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" opacity="50"
        />
        }
        {transformation === 'background-removal' &&
        <CldImage src={publicId} width={300} height={300} alt="image" crop="pad" removeBackground
        />
        }
        </div>
        </div>
        </section>
  )
}
