'use client'

import CallManager from '@/components/call-manager'
import CallSimulator from '@/components/call-simulator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CallsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="manager" className="space-y-6">
          <TabsList>
            <TabsTrigger value="manager">Call Manager</TabsTrigger>
            <TabsTrigger value="simulator">Call Simulator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manager">
            <CallManager />
          </TabsContent>
          
          <TabsContent value="simulator">
            <div className="max-w-2xl mx-auto">
              <CallSimulator />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

