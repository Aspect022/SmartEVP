'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Phone, Clock, MapPin, AlertCircle, Search, Filter, Trash2 } from 'lucide-react'
import type { CallData } from '@/types/call'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  onCallSelect: (call: CallData) => void
  selectedCallId?: string
}

export default function CallQueue({ onCallSelect, selectedCallId }: Props) {
  const [calls, setCalls] = useState<CallData[]>([])
  const [filteredCalls, setFilteredCalls] = useState<CallData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [criticalityFilter, setCriticalityFilter] = useState<string>('all')
  const [displayLimit, setDisplayLimit] = useState(20)

  const fetchCalls = async () => {
    try {
      const response = await fetch('/api/calls?type=all')
      if (response.ok) {
        const data = await response.json()
        // Sort by timestamp, newest first
        const sorted = data.sort((a: CallData, b: CallData) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        setCalls(sorted)
        setFilteredCalls(sorted)
      }
    } catch (error) {
      console.error('Failed to fetch calls:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalls()
    // Poll for new calls every 5 seconds
    const interval = setInterval(fetchCalls, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = [...calls]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((call) =>
        call.phone_number.toLowerCase().includes(query) ||
        call.address?.toLowerCase().includes(query) ||
        call.condition?.toLowerCase().includes(query) ||
        call.call_id.toLowerCase().includes(query)
      )
    }

    // Apply criticality filter
    if (criticalityFilter !== 'all') {
      filtered = filtered.filter((call) => call.criticality === criticalityFilter)
    }

    // Limit display
    filtered = filtered.slice(0, displayLimit)
    setFilteredCalls(filtered)
  }, [calls, searchQuery, criticalityFilter, displayLimit])

  const clearAllCalls = async () => {
    if (confirm('Are you sure you want to clear all calls? This action cannot be undone.')) {
      try {
        // Clear the storage file on backend
        await fetch('/api/calls/clear', { method: 'DELETE' })
        setCalls([])
        setFilteredCalls([])
      } catch (error) {
        console.error('Failed to clear calls:', error)
      }
    }
  }

  const getCriticalityColor = (criticality?: string) => {
    switch (criticality) {
      case 'high':
        return 'bg-red-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-white'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center text-slate-500">Loading calls...</div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Call Queue</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredCalls.length} / {calls.length}</Badge>
          {calls.length > 0 && (
            <Button
              onClick={clearAllCalls}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={criticalityFilter} onValueChange={setCriticalityFilter}>
            <SelectTrigger className="flex-1">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by criticality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Criticality</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={displayLimit.toString()} onValueChange={(v) => setDisplayLimit(parseInt(v))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="20">Show 20</SelectItem>
              <SelectItem value="50">Show 50</SelectItem>
              <SelectItem value="100">Show 100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {filteredCalls.length === 0 ? (
            <div className="text-center text-slate-500 py-8">
              {calls.length === 0 ? (
                'No calls processed yet'
              ) : (
                'No calls match your filters'
              )}
            </div>
          ) : (
            filteredCalls.map((call) => (
              <Card
                key={call.call_id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedCallId === call.call_id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => onCallSelect(call)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="font-semibold text-slate-900 text-sm">
                      {call.phone_number}
                    </span>
                  </div>
                  <Badge className={`${getCriticalityColor(call.criticality)} text-xs`}>
                    {call.criticality?.toUpperCase() || 'UNKNOWN'}
                  </Badge>
                </div>

                {call.condition && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{call.condition}</span>
                  </div>
                )}

                {call.address && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{call.address}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(call.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
