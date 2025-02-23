'use client';
import { TableRow, TableCell, Button } from "flowbite-react";
import Link from "next/link";
import { AssetShow } from "./components/AssetShow";
import { WalletAsset } from "@/model";
import { useAssetStore } from "@/store";
import { useShallow } from 'zustand/react/shallow';

export function TableWalletAssetRow(props: { walletAsset: WalletAsset, walletId: string; }) {
    const {walletAsset, walletId} = props;
    const assetFound = useAssetStore(useShallow((state) => state.assets.find(a => a.symbol === walletAsset.asset.symbol)));
    const asset = assetFound || walletAsset.asset;
    return (
        <TableRow>
            <TableCell>
                <AssetShow asset={asset} />
            </TableCell>
            <TableCell>R$ {asset.price}</TableCell>
            <TableCell>{walletAsset.shares}</TableCell>
            <TableCell>
                <Button className="w-fit" color="light" as={Link} href={`/assets/${asset.symbol}?walletId=${walletId}`}>Comprar/vender</Button>
            </TableCell>
        </TableRow>
    );
}