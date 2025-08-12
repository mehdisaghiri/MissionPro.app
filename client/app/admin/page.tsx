"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { Users, Briefcase, UserCheck, TrendingUp, Search, Trash2, Edit } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "@/Components/Header";

export default function AdminDashboard() {
  const { userProfile, isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();

  // State for dashboard data
  const [stats, setStats] = useState({
    users: { totalUsers: 0, jobseekers: 0, recruiters: 0, admins: 0, newUsers: 0 },
    jobs: { totalJobs: 0, newJobs: 0, totalApplications: 0, jobTypeStats: [] }
  });
  
  // State for users management
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");

  // State for jobs management
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || userProfile?.role !== "admin")) {
      router.push("/");
    }
  }, [isAuthenticated, userProfile, loading, router]);

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const [userStatsRes, jobStatsRes] = await Promise.all([
        axios.get("/api/v1/admin/stats/users"),
        axios.get("/api/v1/admin/stats/jobs")
      ]);
      
      setStats({
        users: userStatsRes.data,
        jobs: jobStatsRes.data
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch dashboard statistics");
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams();
      if (userSearch) params.append("search", userSearch);
      if (userRoleFilter && userRoleFilter !== "all") params.append("role", userRoleFilter);

      const response = await axios.get(`/api/v1/admin/users?${params}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch jobs
  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const params = new URLSearchParams();
      if (jobSearch) params.append("search", jobSearch);
      if (jobTypeFilter && jobTypeFilter !== "all") params.append("jobType", jobTypeFilter);

      const response = await axios.get(`/api/v1/admin/jobs?${params}`);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setJobsLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await axios.put(`/api/v1/admin/users/${userId}/role`, { role: newRole });
      toast.success("User role updated successfully");
      fetchUsers();
      fetchStats();
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(error.response?.data?.message || "Failed to update user role");
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/v1/admin/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers();
      fetchStats();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Delete job
  const deleteJob = async (jobId: string) => {
    try {
      await axios.delete(`/api/v1/admin/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      fetchJobs();
      fetchStats();
    } catch (error: any) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (isAuthenticated && userProfile?.role === "admin") {
      fetchStats();
      fetchUsers();
      fetchJobs();
    }
  }, [isAuthenticated, userProfile]);

  // Search effects
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isAuthenticated && userProfile?.role === "admin") {
        fetchUsers();
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [userSearch, userRoleFilter]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isAuthenticated && userProfile?.role === "admin") {
        fetchJobs();
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [jobSearch, jobTypeFilter]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || userProfile?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#D7DEDC] dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage users, jobs, and monitor platform statistics</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#7263F3] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#7263F3] data-[state=active]:text-white">Users</TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-[#7263F3] data-[state=active]:text-white">Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-800 dark:text-white">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-[#7263F3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.users.totalUsers}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    +{stats.users.newUsers} new this month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-800 dark:text-white">Total Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-[#7263F3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.jobs.totalJobs}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    +{stats.jobs.newJobs} new this month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-800 dark:text-white">Applications</CardTitle>
                  <UserCheck className="h-4 w-4 text-[#7263F3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.jobs.totalApplications}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Total applications</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-800 dark:text-white">Admins</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#7263F3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.users.admins}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Platform administrators</p>
                </CardContent>
              </Card>
          </div>

            {/* User Role Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">User Role Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Job Seekers</span>
                    <Badge variant="secondary" className="bg-[#7263F3]/10 text-[#7263F3]">{stats.users.jobseekers}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Recruiters</span>
                    <Badge variant="secondary" className="bg-[#7263F3]/10 text-[#7263F3]">{stats.users.recruiters}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Admins</span>
                    <Badge variant="secondary" className="bg-[#7263F3]/10 text-[#7263F3]">{stats.users.admins}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">Job Type Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.jobs.jobTypeStats.map((stat: any) => (
                    <div key={stat._id} className="flex justify-between items-center">
                      <span className="capitalize text-gray-700 dark:text-gray-300">{stat._id}</span>
                      <Badge variant="secondary" className="bg-[#7263F3]/10 text-[#7263F3]">{stat.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* Users Management */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white">Users Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Manage user accounts and roles</CardDescription>
              </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="jobseeker">Job Seekers</SelectItem>
                    <SelectItem value="recruiter">Recruiters</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user: any) => (
                        <TableRow key={user._id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.profilePicture || "/placeholder-avatar.png"}
                                alt={user.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.role === "admin" ? "destructive" : "secondary"}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select
                                value={user.role}
                                onValueChange={(newRole) => updateUserRole(user._id, newRole)}
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="jobseeker">Job Seeker</SelectItem>
                                  <SelectItem value="recruiter">Recruiter</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {user.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteUser(user._id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            {/* Jobs Management */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white">Jobs Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Manage job postings and applications</CardDescription>
              </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jobs Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobsLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Loading jobs...
                        </TableCell>
                      </TableRow>
                    ) : jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No jobs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      jobs.map((job: any) => (
                        <TableRow key={job._id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <img
                                src={job.createdBy?.profilePicture || "/placeholder-avatar.png"}
                                alt={job.createdBy?.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span>{job.createdBy?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {job.jobType?.map((type: string) => (
                                <Badge key={type} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{job.applicants?.length || 0}</TableCell>
                          <TableCell>
                            {new Date(job.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{job.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteJob(job._id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
