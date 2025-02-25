"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
  title: string
  content: string | React.ReactNode
  trigger?: React.ReactElement  // 改为可选属性
  open?: boolean                // 新增受控属性
  onOpenChange?: (open: boolean) => void  // 新增状态变化回调
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  confirmVariant?: "default" | "destructive"
  dialogWidth?: string
}

export const ConfirmDialog = ({
  title,
  content,
  trigger,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  dialogWidth = "max-w-lg"
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {/* 条件渲染触发按钮 */}
      {trigger && React.cloneElement(trigger, { 
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          trigger.props.onClick?.(e)
        }
      })}

      <AlertDialogContent className={`${dialogWidth} text-gray-500`}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={
              confirmVariant === "destructive" 
                ? "bg-red-500 hover:bg-red-500/90" 
                : ""
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}