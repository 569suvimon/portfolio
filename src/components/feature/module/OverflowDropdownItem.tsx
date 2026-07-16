"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { MenuItem } from "@/types";
import { iconMap } from "@/utils/iconMap";
import { IcnArrowRight } from "@/components/icons";

interface Props{
    item:MenuItem;
    onSelect?:(item:MenuItem)=>void;
}

export default function OverflowDropdownItem({

    item,
    onSelect,

}:Props){

    const [open,setOpen]=useState(false);

    const hasChildren=!!item.children?.length;

    const Icon=item.icon?iconMap[item.icon]:undefined;

    if(!hasChildren){

        return(

            <li>

                <Link

                    href={item.href ?? "#"}

                    onClick={()=>onSelect?.(item)}

                    className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        hover:bg-zinc-100
                        transition
                    "

                >

                    {Icon && <Icon className="h-4 w-4"/>}

                    <span>{item.label}</span>

                </Link>

            </li>

        );

    }

    return(

        <li>

            <button

                type="button"

                onClick={()=>setOpen(v=>!v)}

                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3
                    hover:bg-zinc-100
                    transition
                "

            >

                <span className="flex items-center gap-3">

                    {Icon && <Icon className="h-4 w-4"/>}

                    {item.label}

                </span>

                <motion.div

                    animate={{
                        rotate:open?90:0
                    }}

                >

                    <IcnArrowRight className="h-4 w-4"/>

                </motion.div>

            </button>

            <AnimatePresence>

                {open && (

                    <motion.ul

                        initial={{
                            height:0,
                            opacity:0
                        }}

                        animate={{
                            height:"auto",
                            opacity:1
                        }}

                        exit={{
                            height:0,
                            opacity:0
                        }}

                        transition={{
                            duration:.2
                        }}

                        className="overflow-hidden bg-zinc-50"

                    >

                        {item.children!.map(child=>(

                            <li key={child.value}>

                                <Link

                                    href={child.href ?? "#"}

                                    onClick={()=>onSelect?.(child)}

                                    className="
                                        block
                                        pl-12
                                        pr-4
                                        py-3
                                        hover:bg-zinc-100
                                    "

                                >

                                    {child.label}

                                </Link>

                            </li>

                        ))}

                    </motion.ul>

                )}

            </AnimatePresence>

        </li>

    );

}