"use client";

import type { Comment } from "@/lib/definitions";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCommentAction } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CommentSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters."),
  content: z.string().min(1, "Comment cannot be empty."),
});

interface CommentSectionProps {
  updateId: string;
  comments: Comment[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" type="submit" disabled={pending}>
      {pending ? "Posting..." : "Post Comment"}
    </Button>
  );
}

export function CommentSection({ updateId, comments }: CommentSectionProps) {
  const [state, formAction] = useFormState(addCommentAction, {
    message: "",
    errors: undefined,
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { author: "", content: "" },
  });

  useEffect(() => {
    if (!state?.errors && state?.message !== 'Validation failed.') {
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
            No comments yet. Be the first to react.
          </p>
        )}
      </div>

      <div>
        <form ref={formRef} action={formAction} className="space-y-4 border-t pt-6">
          <h4 className="text-md font-semibold">Add a comment</h4>
          <input type="hidden" name="updateId" value={updateId} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input name="author" placeholder="Your Name" className="sm:col-span-1" />
            <Textarea name="content" placeholder="Share your thoughts..." className="sm:col-span-2" rows={1}/>
          </div>
          {state?.errors?.author && <p className="text-sm text-destructive">{state.errors.author[0]}</p>}
          {state?.errors?.content && <p className="text-sm text-destructive">{state.errors.content[0]}</p>}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
