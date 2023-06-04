import { useUser } from '@/context/auth';
import { PerformanceStats } from '@/views/base/components/PerformanceStats';

interface PerformanceStatsSelfProps {
    className?: string;
}

export const PerformanceStatsSelf = ({ className }: PerformanceStatsSelfProps) => {
    const { user } = useUser();

    return (
        <PerformanceStats owner={user.username} className={className} />
    );
};
