'use client'
import React, { ReactNode } from "react"

interface PrivateLayoutProps {
    children: ReactNode
}

export default function layoutPanel({ children }: PrivateLayoutProps): JSX.Element {
    return (
        <>
            {children}
        </>
    )
}