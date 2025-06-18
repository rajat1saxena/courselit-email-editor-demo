"use client";

import { Button } from "@/components/ui/button";
import { EmailEditor, renderEmailToHtml } from "@courselit/email-editor";
import type { Email } from "@courselit/email-editor";
import { Text, Link, Separator } from "@courselit/email-editor/blocks";
// import "@courselit/email-editor/styles.css";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Code, Rocket } from "lucide-react";

export default function Home() {
    const [email, setEmail] = useState<Email | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const blocks = [Text, Link, Separator];

    const handleChange = (email: Email) => {
        console.log('Email content changed:', email);
        setEmail(email);
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedHtml);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    const renderEmail = async () => {
        if (!email) {
            console.log('No email content available');
            return;
        }

        try {
            const html = await renderEmailToHtml({email, blocks});
            setGeneratedHtml(html);
            setShowDialog(true);
        } catch (error) {
            console.error('Error generating HTML:', error);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center py-3 px-4 border-b">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">Email Editor</h1>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>by</span>
                        <a href="https://courselit.app" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-blue-800">CourseLit</a>
                    </div>
                </div>
                <Button 
                    onClick={renderEmail} 
                    className="self-center"
                    disabled={!email}
                >
                    <Code className="w-4 h-4 mr-1" />
                    Export HTML
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <EmailEditor 
                    blocks={blocks} 
                    onChange={handleChange}
                    initialEmail={email}
                />
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Exported HTML</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto max-h-[240px]">
                        <pre className="w-full p-3 border rounded-md font-mono text-xs bg-gray-50 overflow-auto whitespace-pre-wrap">
                            {generatedHtml}
                        </pre>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                            Close
                        </Button>
                        <Button onClick={copyToClipboard} variant="default">
                            <Copy className="w-4 h-4 mr-1" />
                            {copySuccess ? "Copied!" : "Copy HTML"}
                        </Button>
                    </div>
                    <div className="w-full mt-4 rounded-xl bg-[#1a1a1a] shadow-lg p-4 flex flex-col items-center text-center border border-gray-800">
                        <div className="text-base font-bold mb-1 text-white">
                            Grow your audience and sell digital products with <span className="text-[#84ffc9]">CourseLit</span>
                        </div>
                        <div className="text-gray-400 mb-3 text-sm">
                            Send campaigns to your audience, or build one from scratch by selling digital products.<br />
                            Start for free—hundreds of creators trust CourseLit.
                        </div>
                        <a
                            href="https://courselit.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#84ffc9] text-[#1a1a1a] font-semibold shadow hover:bg-[#93ffd0] transition-colors"
                        >
                            <Rocket className="w-4 h-4" />
                            Try CourseLit Free
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
