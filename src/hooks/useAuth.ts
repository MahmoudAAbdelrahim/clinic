"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const getUser = async () => {

      try {

        const { data } =
          await axios.get(
            "/api/auth/me"
          );

        setUser(data.user);

      } catch {

        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    getUser();

  }, []);

  return {
    user,
    loading,
  };
}