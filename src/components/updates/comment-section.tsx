"use client";

import type { Comment } from "@/lib/definitions";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCommentAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalization } from "@/hooks/use-localization";

interface CommentSectionProps {
  updateId: string;
  comments: Comment[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLocalization();
  return (
    <Button size="sm" type="submit" disabled={pending}>
      {pending ? t('commentSection.postButtonPending') : t('commentSection.postButton')}
    </Button>
  );
}

export function CommentSection({ updateId, comments }: CommentSectionProps) {
  const { t } = useLocalization();

  const CommentSchema = z.object({
    author: z.string().min(2, t('validation.authorMin')),
    content: z.string().min(1, t('validation.commentMin')),
  });

  const [state, formAction] = useActionState(addCommentAction, {
    message: "",
    errors: undefined,
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { author: "", content: "" },
  });

  useEffect(() => {
    if (!state?.errors && state?.message !== 'errors.validationFailed') {
      form.reset();
      formRef.current?.reset();
    }
  }, [state, form]);

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{comment.author}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-foreground/80">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            {t('commentSection.noComments')}
          </p>
        )}
      </div>

      <div>
        <form ref={formRef} action={formAction} className="space-y-4 border-t pt-6">
          <h4 className="text-md font-semibold">{t('commentSection.addComment')}</h4>
          <input type="hidden" name="updateId" value={updateId} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input name="author" placeholder={t('commentSection.namePlaceholder')} className="sm:col-span-1" />
            <Textarea name="content" placeholder={t('commentSection.commentPlaceholder')} className="sm:col-span-2" rows={1}/>
          </div>
          {state?.errors?.author && <p className="text-sm text-destructive">{t(state.errors.author[0])}</p>}
          {state?.errors?.content && <p className="text-sm text-destructive">{t(state.errors.content[0])}</p>}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
