"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoguitForm = () => {
    const router = useRouter()
      const [isSubmitting, setIsSubmitting] = useState(false);

  const uitloggen = async () => {
    setIsSubmitting(true);
    const result = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.push(result.url);
  };
  return (
    <div className="justify-center pt-7">
      <div className="min-h-5 min-w-15 text-center p-5">
        <div className="text-slate-100 text-xl items-center m-5">
          U kunt uitloggen door hieronder te klikken
        </div>
        <div>
          <Button
            size="lg"
            color="danger"
            startContent={<ArrowRightStartOnRectangleIcon className="w-6" />}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={uitloggen}
          >
            {isSubmitting ? "U wordt uitgelogd" : "Uitloggen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoguitForm;
