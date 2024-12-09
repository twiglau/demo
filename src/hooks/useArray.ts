import { useState } from "react";

export default function useArray<T>(initialArray: T[]) {
   const [value, setValue] = useState(initialArray)

   return {
    value,
    setValue,
    add:(item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index:number) => {
        const copyArray = [...value]
        copyArray.splice(index, 1)
        setValue(copyArray)
    }
   }
}