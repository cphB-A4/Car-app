import React, { useEffect, useState, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../api/InitSupabse';
import { useAppDispatch } from '../store/hooks';
import { setLoading } from '../store/slices/view';

export const UserContext = createContext<{ user: User | null; session: Session | null }>({
  user: null,
  session: null,
});

export const UserContextProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      dispatch(setLoading(false))
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null);
      dispatch(setLoading(false))
    })
  }, []);

  const value = {
    session,
    user,
  };
  return <UserContext.Provider
    value={value}
    {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }
  return context;
};