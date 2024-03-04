"use client";

import { Heart } from "@/components/icons/heart";
import { CldImage, CldImageProps, cloudinaryLoader } from "next-cloudinary";
import { setAsFavoriteAction } from "../app/gallery/actions";
import { useState, useTransition } from "react";
import { SearchResult } from "../app/gallery/page";
import { FullHeart } from "@/components/icons/full-heart";
import { ImageMenu } from "./image-menu";

export function CloudinaryImage(props: {
    imageData:SearchResult; 
    onUnheart?:(
    unheartedResource:SearchResult) => void;
} & Omit<CldImageProps, "src">) {
    const {imageData, onUnheart} = props;

    // const isFavorited = imageData.tags.includes('favorite');
    const [isFavorited, setIsFavorited] = useState(
        imageData.tags.includes('favorite')
    )
    const [transition, startTransition] = useTransition();

    return (
        <div className="relative">
        <CldImage {...props} src={imageData.public_id}/>
        {isFavorited ?
        <FullHeart 
        onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(()=>{
                setAsFavoriteAction(imageData.public_id, false);
            })
            }}
        className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        /> 
        : null}
        <Heart 
        onClick={() => {
            setIsFavorited(true);
            startTransition(()=>{
            setAsFavoriteAction(imageData.public_id, true);
            })
        }}
        className="absolute top-2 left-2 hover:text-red-500 text-white cursor-pointer"
        /> 
        <ImageMenu image={imageData}/>
        </div>
    );
}