
"use client";

import type { Comment } from "@/lib/definitions";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCommentAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "../ui/card";
import { UserIcon } from "../icons";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface CommentSectionProps {
  updateId: string;
  comments: Comment[];
}

const CommentSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters."),
  content: z.string().min(1, "Comment cannot be empty."),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Posting..." : "Post Comment"}
    </Button>
  );
}

export function CommentSection({ updateId, comments }: CommentSectionProps) {
  const [state, formAction] = useActionState(addCommentAction, {
    message: "",
    errors: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const { register, formState: { errors }, reset } = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { author: "", content: "" },
  });

  useEffect(() => {
    if (state?.message && !state.errors) {
      reset();
      formRef.current?.reset();
    }
  }, [state, reset]);

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
             <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10">
                    <UserIcon className="h-6 w-6 text-primary/80" />
                </AvatarFallback>
             </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-card-foreground">{comment.author}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-card-foreground/80">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to react.
          </p>
        )}
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="pt-6">
          <form ref={formRef} action={formAction} className="space-y-4">
            <h4 className="text-md font-semibold text-card-foreground">Add a comment</h4>
            <input type="hidden" name="updateId" value={updateId} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Input {...register("author")} placeholder="Your Name" aria-invalid={!!errors.author} />
                {errors.author && <p className="text-sm text-destructive mt-1">{errors.author.message}</p>}
                 {state?.errors?.author && <p className="text-sm text-destructive mt-1">{state.errors.author[0]}</p>}
              </div>
              <div className="sm:col-span-2">
                <Textarea {...register("content")} placeholder="Share your thoughts..." rows={1} aria-invalid={!!errors.content}/>
                 {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
                 {state?.errors?.content && <p className="text-sm text-destructive mt-1">{state.errors.content[0]}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
