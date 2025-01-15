'use client';

import React from "react";

interface InputProps {
    placeholder?: string,
    value?: string,
    type?: string,
    disabled?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange,
}) => {
    return (
        <input 
            disabled={disabled}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus-border-2 transition disabled:bg-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed"
        />
    )
}        

export default Input;