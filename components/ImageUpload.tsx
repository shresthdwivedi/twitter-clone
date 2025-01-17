'use client';

import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    label?: string,
    value: string,
    disabled?: boolean,
    onChange: (base64: string) => void,
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    value,
    disabled,
    onChange,
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange])

    const handleDrop = useCallback((files: File[]) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result as string;
            setBase64(result);
            handleChange(result);
        }

        reader.readAsDataURL(file);
    }, [handleChange])
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    })

    return (
        <div 
            {...getRootProps({
                className: "w-full p-4 border-2 border-dotted border-neutral-700 rounded-md text-white text-center cursor-pointer"
            })}
        >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex justify-center items-center">
                        <Image 
                            src={base64}
                            width={100}
                            height={100}
                            alt="uploaded-image"
                        />
                    </div>
                ) : (
                    <p className="text-white text-sm">
                        {label}
                    </p>
                )
            }
        </div>
    )
}

export default ImageUpload;