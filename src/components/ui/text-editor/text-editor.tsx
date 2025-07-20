'use client'

import { ComponentProps, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill-new'

import { Stack } from '@mui/material'
import cn from 'classnames'

import { useClickOutside } from '@/hooks/useClickOutside'

import { TypographyV2 } from '../typography'
import styles from './styles.module.scss'

type TProps = ComponentProps<typeof ReactQuill> & {
  label?: string
  error?: boolean
}

const TextEditor = ({ className, label, error, ...rest }: TProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const quillRef = useRef<ReactQuill>(null)
  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => setIsFocused(false))

  useEffect(() => {
    const quill = quillRef.current?.getEditor?.()
    if (!quill) return

    const handleBlur = () => setIsFocused(false)
    quill.on('blur', handleBlur)

    return () => {
      quill.off('blur', handleBlur)
    }
  }, [])

  return (
    <Stack
      width="100%"
      gap={1}
      ref={wrapperRef}
      className={cn(styles.wrapper, className, {
        [styles.error]: error,
      })}
    >
      {!!label && (
        <TypographyV2 fontWeight="medium" color="secondary" fontSize="text-l">
          {label}
        </TypographyV2>
      )}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: 1 }, { header: 2 }, { header: 3 }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        className={cn(styles.editor, {
          [styles.focused]: isFocused,
        })}
        onFocus={() => setIsFocused(true)}
        {...rest}
      />
    </Stack>
  )
}

export { TextEditor }
