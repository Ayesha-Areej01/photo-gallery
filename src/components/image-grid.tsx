
import {SearchResult} from "@/app/gallery/page";
import { CloudinaryImage } from "./cloudinary-image";
import { ReactNode } from "react";

export function ImageGrid({images,
    getImage}:
    {images: SearchResult[];
    getImage: (imageData: SearchResult) => ReactNode;
    }) {

const MAX_COLUMNS = 4 ;
function getColumns(colIndex: number) {
return images.filter(
(resources, idx) =>  idx % MAX_COLUMNS === colIndex
)
}

return (
<div className='grid grid-cols-4 gap-4'>
    {[getColumns(0),getColumns(1),getColumns(2),getColumns(3),].map(             
(column, idx) => 
<div key={idx} className='flex flex-col gap-4'>
{column.map((result) => (
    <CloudinaryImage
    key={result.public_id}
    imageData={result}
    width="400"
    height="300"
    alt="Image from Cloudinary"
/>
))}
</div>
)
}
</div>
);
}