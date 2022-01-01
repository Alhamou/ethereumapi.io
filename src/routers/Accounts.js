const express = require("express")
const router = express.Router()


const accountsController = require("../controllers/Accounts")

router.get("/balance", accountsController.balance)
router.get("/balancemulti", accountsController.balancemulti)
router.get("/listNormalTransactions", accountsController.listNormalTransactions)
router.get("/listInternalTransactions", accountsController.listInternalTransactions)
router.get("/txlistinternal", accountsController.txlistinternal)
router.get("/txlistinternalByBlock", accountsController.txlistinternalByBlock)
router.get("/listERC20TokenTransferByAddress", accountsController.listERC20TokenTransferByAddress)
router.get("/listERC721TokenTransferByAddress", accountsController.listERC721TokenTransferByAddress)
router.get("/listBlocksMinedbyAddress", accountsController.listBlocksMinedbyAddress)



module.exports = router;