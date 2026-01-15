import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { LogOut, RefreshCw } from 'lucide-react'

interface Transaction {
    id: string
    amount: number
    phone: string
    status: string
    timestamp: string
}

interface DashboardProps {
    apiKey: string
    onLogout: () => void
}

export function Dashboard({ apiKey, onLogout }: DashboardProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalAmount: 0,
        successfulTransactions: 0,
    })

    const fetchTransactions = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/transactions', {
                headers: {
                    'x-api-key': apiKey,
                },
            })
            const data = await response.json()

            if (data.success) {
                setTransactions(data.transactions)

                // Calculate stats
                const total = data.transactions.length
                const successful = data.transactions.filter((t: Transaction) => t.status === 'completed').length
                const totalAmount = data.transactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0)

                setStats({
                    totalTransactions: total,
                    totalAmount,
                    successfulTransactions: successful,
                })
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
        const interval = setInterval(fetchTransactions, 5000) // Poll every 5 seconds
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
        }).format(amount)
    }

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('en-KE', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            PayFlow Dashboard
                        </h1>
                        <p className="text-slate-400 mt-1">Instant M-Pesa Settlement Platform</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={fetchTransactions}
                            className="border-slate-600 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400"
                            aria-label="Refresh transactions"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onLogout}
                            className="border-slate-600 bg-red-600/20 hover:bg-red-600/30 text-red-400"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-blue-500/30 bg-blue-500/10 backdrop-blur">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-slate-300">Total Transactions</CardDescription>
                            <CardTitle className="text-3xl text-white">{stats.totalTransactions}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-cyan-500/30 bg-cyan-500/10 backdrop-blur">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-slate-300">Total Amount</CardDescription>
                            <CardTitle className="text-3xl text-white">{formatCurrency(stats.totalAmount)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-green-500/30 bg-green-500/10 backdrop-blur">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-slate-300">Success Rate</CardDescription>
                            <CardTitle className="text-3xl text-white">
                                {stats.totalTransactions > 0
                                    ? Math.round((stats.successfulTransactions / stats.totalTransactions) * 100)
                                    : 0}
                                %
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* Transactions Table */}
                <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Transactions</CardTitle>
                        <CardDescription className="text-slate-300">
                            Real-time transaction updates
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-8 text-slate-400">Loading transactions...</div>
                        ) : transactions.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">No transactions yet</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-700 hover:bg-slate-700/50">
                                        <TableHead className="text-slate-300">Transaction ID</TableHead>
                                        <TableHead className="text-slate-300">Phone Number</TableHead>
                                        <TableHead className="text-slate-300">Amount</TableHead>
                                        <TableHead className="text-slate-300">Status</TableHead>
                                        <TableHead className="text-slate-300">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id} className="border-slate-700 hover:bg-slate-700/50">
                                            <TableCell className="font-mono text-sm text-slate-300">
                                                {transaction.id.slice(0, 8)}...
                                            </TableCell>
                                            <TableCell className="text-slate-300">{transaction.phone}</TableCell>
                                            <TableCell className="font-semibold text-white">
                                                {formatCurrency(transaction.amount)}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed'
                                                            ? 'bg-green-900/50 text-green-300'
                                                            : transaction.status === 'pending'
                                                                ? 'bg-yellow-900/50 text-yellow-300'
                                                                : 'bg-red-900/50 text-red-300'
                                                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{formatDate(transaction.timestamp)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
