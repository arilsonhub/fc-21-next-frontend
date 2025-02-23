'use client';
import { Asset } from "@/model";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import { useShallow } from "zustand/shallow";
import { AssetShow } from "../components/AssetShow";
import Link from "next/link";

export function TableAssetRow(props: { asset: Asset, walletId: string; }) {
    const {asset, walletId} = props;
    const assetFound = useAssetStore(useShallow((state) => state.assets.find(a => a.symbol === asset.symbol)));
    const asset_ = assetFound || asset;
    return (
        <TableRow>
            <TableCell>
                <AssetShow asset={asset_} />
            </TableCell>
            <TableCell>R$ {asset_.price}</TableCell>
            <TableCell>
                <Button className="w-fit" color="light" as={Link} href={`/assets/${asset_.symbol}?walletId=${walletId}`}>Comprar/vender</Button>
            </TableCell>
        </TableRow>
    );
}