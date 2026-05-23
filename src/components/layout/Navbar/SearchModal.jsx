"use client";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function SearchModal({ open, onClose }) {
  return (
    <CommandDialog open={open} onOpenChange={onClose}>
      <Command>
        <CommandInput placeholder="Search VESTIS..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Men">
            <CommandItem>Men's Tops</CommandItem>
            <CommandItem>Men's Bottoms</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Women">
            <CommandItem>Women's Tops</CommandItem>
            <CommandItem>Women's Bottoms</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Shoes">
            <CommandItem>Trainers</CommandItem>
            <CommandItem>Boots</CommandItem>
            <CommandItem>Sandals</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
