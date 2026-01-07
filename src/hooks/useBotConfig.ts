import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useBusiness } from './useBusiness';
import type { BotConfig, BotConfigUpdate } from '@/types/database';

export function useBotConfig() {
  const { data: business } = useBusiness();

  return useQuery({
    queryKey: ['bot-config', business?.id],
    queryFn: async () => {
      if (!business) return null;

      const { data, error } = await supabase
        .from('bot_configs')
        .select('*')
        .eq('business_id', business.id)
        .maybeSingle();

      if (error) throw error;
      return data as BotConfig | null;
    },
    enabled: !!business,
  });
}

export function useUpdateBotConfig() {
  const queryClient = useQueryClient();
  const { data: business } = useBusiness();

  return useMutation({
    mutationFn: async (updates: BotConfigUpdate) => {
      if (!business) throw new Error('No business found');

      const { data, error } = await supabase
        .from('bot_configs')
        .update(updates)
        .eq('business_id', business.id)
        .select()
        .single();

      if (error) throw error;
      return data as BotConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bot-config'] });
    },
  });
}

export function useBots() {
  return useQuery({
    queryKey: ['bots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });
}
