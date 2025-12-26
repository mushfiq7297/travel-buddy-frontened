/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/shared/ImageUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "@/types/profile.schema";
import { useAuth } from "@/context/AuthContext";
import TagInput from "@/components/shared/TagInput";
import { MapPinIcon } from "lucide-react";



export default function ProfilePage() {
  const { user} = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, { credentials: "include" });
      const data = await res.json();
      setProfile(data.data);
    };
    loadProfile();
  }, []);


  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <Card className="p-6 flex flex-col md:flex-row gap-6 items-center">
        <Avatar className="w-28 h-28">
          <AvatarImage src={profile.profileImage} />
          <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">{profile.bio}</p>
          <p className="text-sm flex gap-1 items-center">  <MapPinIcon className="w-3 h-3" /><span>{profile.currentLocation || ""}</span></p>

          <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
            {profile.travelInterests?.map((item: string) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>

        {/* EDIT BUTTON */}
 

        {user && user?._id === profile?._id && (
  <Button onClick={() => setOpen(true)}>Edit Profile</Button>
)}
      </Card>

      {/* EXTRA INFO */}
     
      <Card className="p-6">
  <Tabs defaultValue="countries" className="w-full">
    {/* TAB HEADERS */}
    <TabsList className="grid grid-cols-3 mb-6">
      <TabsTrigger value="countries">Countries</TabsTrigger>
      <TabsTrigger value="trips">My Trips</TabsTrigger>
      <TabsTrigger value="reviews">Reviews</TabsTrigger>
    </TabsList>

    {/* COUNTRIES TAB */}
    <TabsContent value="countries" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Countries visited
      </p>
      <p className="text-2xl font-bold">
        {profile.visitedCountries?.length || 0}
      </p>

      <div className="flex flex-wrap gap-2">
        {profile.visitedCountries?.map((c: string) => (
          <Badge key={c}>{c}</Badge>
        ))}
      </div>
    </TabsContent>

    {/* TRIPS TAB */}
    <TabsContent value="trips" className="space-y-4">
      {profile.trips?.length ? (
        profile.trips.map((trip: any) => (
          <Card key={trip._id} className="p-4">
            <h3 className="font-semibold">{trip.destination}</h3>
            <p className="text-sm text-muted-foreground">
              {trip.description}
            </p>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground">No trips yet</p>
      )}
    </TabsContent>

    {/* REVIEWS TAB */}
    <TabsContent value="reviews" className="space-y-4">
      {profile.reviews?.length ? (
        profile.reviews.map((review: any) => (
          <Card key={review._id} className="p-4">
            <p className="font-semibold">{review.author}</p>
            <p className="text-sm">{review.comment}</p>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground">No reviews yet</p>
      )}
    </TabsContent>
  </Tabs>
</Card>


      {/* EDIT MODAL */}
      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
        onUpdated={setProfile}
      />
    </div>
  );
}

/* =========================
   EDIT PROFILE MODAL
========================= */

function EditProfileModal({ open, onClose, profile, onUpdated }: any) {
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profile,
  });

   useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

 const onSubmit = async (values: ProfileSchemaType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${profile._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(values),
    }
  );

  if (!res.ok) {
    console.error("Update failed");
    return;
  }

  const data = await res.json();
  onUpdated(data.data);
  onClose();
};
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Image */}
          <ImageUploader
            value={form.watch("profileImage")}
            onChange={(url: string) =>
              form.setValue("profileImage", url)
            }
          />

          <Input placeholder="Name" {...form.register("name")} />

          <Textarea placeholder="Bio" {...form.register("bio")} />

          <Input
            placeholder="Current Location"
            {...form.register("currentLocation")}
          />

          {/* Gender */}
          <select
            className="w-full border rounded-md px-3 py-2"
            {...form.register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
       
          </select>

          <Input
            type="number"
            placeholder="Age"
            {...form.register("age")}
          />

         <TagInput
    placeholder="Add travel interest (e.g. hiking)"
    value={form.watch("travelInterests")}
    onChange={(val: any) => form.setValue("travelInterests", val)}
  />

  {/* VISITED COUNTRIES */}
  <TagInput
    placeholder="Add visited country (e.g. Japan)"
    value={form.watch("visitedCountries")}
    onChange={(val: any) => form.setValue("visitedCountries", val)}
  />


         
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
