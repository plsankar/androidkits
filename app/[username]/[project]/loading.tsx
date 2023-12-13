import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Readme from "@/components/readme";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
    return (
        <div className="py-10">
            <div className="container">
                <div className="border-b pb-5">
                    <Skeleton className="bg-secondary w-[400px] h-[30px] mb-2" />
                    <Skeleton className="bg-secondary w-[80%] h-[24px]" />
                </div>
                <div className="flex flex-row-reverse gap-4 lg:gap-10 mt-10">
                    <div className="w-1/3">
                        <Card className="rounded-sm">
                            <CardHeader className="p-3">
                                <div className="flex flex-col divide-y space-y-3">
                                    <div>
                                        <h2 className="mb-1">Repository</h2>
                                        <Skeleton className="bg-secondary w-[80%] h-[20px]" />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 pt-3">Homepage</h2>
                                        <Skeleton className="bg-secondary w-[80%] h-[20px]" />
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="w-2/3">
                        <Tabs defaultValue="readme" className="w-full">
                            <TabsList className="bg-none">
                                <TabsTrigger value="readme">Readme</TabsTrigger>
                                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                            </TabsList>
                            <div className="mt-10">
                                <TabsContent value="readme">
                                    <Skeleton className="bg-secondary w-[400px] h-[30px] mb-2" />
                                    <div className="my-3 border-b"></div>
                                    <Skeleton className="bg-secondary w-[100%] h-[24px] mb-3" />
                                    <Skeleton className="bg-secondary w-[100%] h-[24px]" />
                                </TabsContent>
                                <TabsContent value="discussion">Coming Soon.</TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
