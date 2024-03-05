"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SearchForm({initialSearch}: {initialSearch: string}){
    const [tagName, setTagName] = useState(initialSearch ?? "");
    const router = useRouter();

    useEffect(() => {
        setTagName(initialSearch);
    }, [initialSearch])

    return (
        <div>
    <form onSubmit={(e) => {
    e.preventDefault();
    router.replace(`/gallery?search=${encodeURIComponent(tagName)}`)
    router.refresh();
}}
    >
    <Label htmlFor="tag-name" className="text-right">
    Search By Tag
    </Label>
    <div className="flex gap-2">
    <Input 
    onChange={e => setTagName(e.currentTarget.value)}
    id="album-name" 
    value={tagName}/>
    <Button type="submit">Search</Button>
    </div>
    </form>
    </div>
    )
}