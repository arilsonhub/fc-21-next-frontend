import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { WalletList } from "../components/WalletList";
import { getAssets, getMyWallet } from "@/queries/queries";
import { AssetsSync } from "../components/AssetsSync";
import { TableAssetRow } from "./TableAssetRow";

export default async function AssetsListPage({searchParams}: {searchParams: Promise<{walletId: string}>}) {
  const {walletId} = await searchParams;

  if(!walletId) {
      return <WalletList />;
  }
  
  const wallet = await getMyWallet(walletId);

  if(!wallet) {
    return <WalletList />;
  }

  const assets = await getAssets();
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map((asset, key) => (
              <TableAssetRow key={key} asset={asset} walletId={walletId} />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync assetsSymbols={assets.map((asset) => asset.symbol)} />
    </div>
  );
}
