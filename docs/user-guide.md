# OpenClaw Control Tower User Guide

## 🎯 Overview

The OpenClaw Control Tower is a comprehensive dashboard for managing and monitoring your multi-agent federation. This guide will help you get started and make the most of all available features.

## � Getting Started

### After Installation

1. **Start the Control Tower**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode  
   npm start
   ```

2. **Access the Dashboard**
   - Open your browser to `http://localhost:18805`
   - You should see the Federation Control Tower dashboard

3. **Verify Agent Status**
   - Check that all your agents are listed in the Agents tab
   - Verify green status indicators for active agents

## 📊 Dashboard Overview

### Main Dashboard Elements

#### 1. Header Section
- **Federation Title**: "🦞 Federation Control Tower"
- **Version Information**: Shows current version (v5.5)
- **Last Updated**: Timestamp of last data refresh
- **Action Buttons**: 
  - 🔄 Refresh - Pull latest data
  - 🔍 Discover - Search for new providers/models
  - ⚡ Sync - Update token limits and costs

#### 2. Federation Health Bar
- **Overall Success Rate**: Percentage of successful operations
- **Health Indicators**: 
  - ● 8 Active (green)
  - ● 1 Idle (yellow) 
  - ● 0 Error (red)

#### 3. Quick Metrics Cards
- **Active Agents**: Number of currently active agents
- **Idle Agents**: Number of idle agents
- **Error Agents**: Number of agents with errors
- **Total Agents**: Complete agent count

#### 4. Main Content Area
- **Agents Tab**: Complete agent monitoring and management
- **API Credits Tab**: Usage tracking and cost monitoring
- **Metrics Tab**: Detailed analytics and performance data

## 👥 Agents Management

### Agent Status Overview

Each agent card displays:
- **Name & Role**: Agent identifier and function
- **Status**: Active/Idle/Error with color coding
- **Uptime**: Percentage of time operational
- **Model Information**: Current model and provider
- **Performance Metrics**: Success rate and response time
- **Current Task**: What the agent is working on
- **Task Count**: Total tasks completed

### Agent Details

Click on any agent card to expand and see:
- **Detailed Performance**: Historical performance data
- **Model Configuration**: Current model and provider settings
- **Task History**: Recent task completions
- **Error Logs**: Any errors or issues encountered
- **Configuration Options**: Agent-specific settings

### Agent Actions

#### Manual Agent Control
- **Restart Agent**: Force restart of unresponsive agents
- **Change Model**: Switch to different model/provider
- **Update Configuration**: Modify agent parameters
- **View Logs**: Access detailed agent logs

#### Bulk Operations
- **Restart All**: Restart all agents simultaneously
- **Health Check**: Run comprehensive diagnostics
- **Configuration Sync**: Sync configurations across all agents

## 📋 Agenda Management

### Agenda Panel

The agenda panel shows:
- **Priority Tasks**: High, Medium, Low priority items
- **Progress Tracking**: Visual progress bars
- **Due Dates**: Task deadlines
- **Assignments**: Which agent is responsible
- **Status**: In progress, completed, pending

### Managing Tasks

#### Adding New Tasks
1. Click "Add Task" button
2. Fill in task details:
   - Task name and description
   - Priority level (High/Medium/Low)
   - Due date
   - Agent assignment
3. Save the task

#### Updating Task Status
- Click on existing task to edit
- Update progress percentage
- Change status (pending/in progress/completed)
- Modify due dates or assignments

### Task Organization

#### Filtering and Sorting
- **By Priority**: Filter by High/Medium/Low priority
- **By Status**: Show pending, in progress, completed
- **By Agent**: Filter tasks by assigned agent
- **By Date**: Sort by due date

#### Bulk Operations
- **Mark Complete**: Mark multiple tasks as completed
- **Reschedule**: Move multiple tasks to new dates
- **Reassign**: Change agent assignments for multiple tasks

## 💎 API Credits Monitoring

### Credit Overview

The API Credits tab shows:
- **Provider Usage**: Tokens used by each provider
- **Cost Tracking**: Estimated costs for each provider
- **Budget Limits**: Set and track budget limits
- **Rate Limits**: Current rate limit usage

### Provider Details

Each provider card displays:
- **Provider Name**: HuggingFace, Google AI, OpenAI, etc.
- **Input Tokens**: Total input tokens used
- **Output Tokens**: Total output tokens generated
- **Estimated Cost**: Current usage costs
- **Rate Limit Status**: Current RPM/RPD usage
- **Budget Progress**: Percentage of budget used

### Cost Management

#### Setting Budgets
1. Navigate to API Credits tab
2. Click "Set Budget" for each provider
3. Enter monthly budget amount
4. Save and enable budget tracking

#### Cost Optimization
- **Low Usage Providers**: Identify underutilized providers
- **High Cost Agents**: Find agents with excessive usage
- **Alternative Models**: Suggest more cost-effective models
- **Usage Patterns**: Analyze usage trends over time

## 📊 Federation Metrics

### Performance Analytics

The Metrics tab provides:
- **Response Time Analysis**: Average response times across agents
- **Success Rate Trends**: Historical success rate data
- **Token Usage Patterns**: Input/output token trends
- **Error Rate Analysis**: Frequency and types of errors

### System Health

#### Resource Monitoring
- **Memory Usage**: Current memory consumption
- **CPU Usage**: Processing power utilization
- **Network Traffic**: Data transfer rates
- **Storage Usage**: Disk space consumption

#### Performance Alerts
- **High Response Times**: Alert when response times exceed thresholds
- **Error Rate Spikes**: Notification of increased error rates
- **Resource Warnings**: Alerts for high resource usage
- **Budget Warnings**: Cost budget nearing limits

## 📱 Mobile Access

### Mobile Optimization

The Control Tower is optimized for mobile devices:
- **Responsive Design**: Adapts to different screen sizes
- **Touch Interface**: Optimized for touch interactions
- **Mobile Navigation**: Simplified mobile menu structure
- **Performance**: Fast loading on mobile connections

### Tailscale Integration

For secure mobile access:
1. **Install Tailscale** on your server
2. **Configure Access** policies for mobile devices
3. **Access Dashboard** via Tailscale IP address
   ```
   http://<your-tailscale-ip>:18805
   ```

### Mobile Features

#### Optimized for Mobile
- **Swipe Gestures**: Navigate with swipe gestures
- **Touch Targets**: Large, easy-to-tap buttons
- **Mobile-First Layout**: Important information first
- **Offline Capability**: Critical functions work offline

#### Mobile Notifications
- **Agent Status Changes**: Get notified of agent status changes
- **Task Updates**: Receive task completion notifications
- **Alerts**: Important system alerts on mobile
- **Push Notifications**: Real-time push notifications

## 🔧 Configuration

### Environment Setup

#### Environment Variables
Create a `.env.local` file in the root directory:

```bash
# OpenClaw Configuration
OPENCLAW_GATEWAY_URL=http://localhost:8080
OPENCLAW_API_KEY=your-api-key

# Database (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/controltower

# External APIs (Optional)
OPENAI_API_KEY=your-openai-key
GOOGLE_AI_API_KEY=your-google-ai-key
HUGGINGFACE_API_KEY=your-huggingface-key
```

### Agent Configuration

#### Agent Model Settings
Configure which models each agent uses:

```typescript
// lib/agentConfig.ts
export const agentConfig = {
  amin: {
    model: "zai/glm-5",
    provider: "zai",
    maxTokens: 4000,
    temperature: 0.7,
    timeout: 30000
  },
  katib: {
    model: "ollama/kimi-k2.5:cloud", 
    provider: "ollama",
    maxTokens: 8000,
    temperature: 0.8
  }
  // ... other agents
};
```

#### Provider Configuration
Configure provider-specific settings:

```typescript
// lib/providerConfig.ts
export const providerConfig = {
  zai: {
    baseUrl: "https://api.zai.com/v1",
    maxRPM: 60,
    maxRPD: 10000,
    costPer1kTokens: 0.002
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    maxRPM: 3500,
    maxRPD: 90000,
    costPer1kTokens: 0.002
  }
};
```

## 🛠️ Troubleshooting

### Common Issues

#### Agents Not Showing
1. **Check OpenClaw Gateway**: Ensure gateway is running
2. **Verify API Configuration**: Check API keys and URLs
3. **Network Connectivity**: Confirm network access
4. **Agent Registration**: Ensure agents are registered with gateway

#### High Response Times
1. **Model Selection**: Consider switching to faster models
2. **Network Issues**: Check network connectivity
3. **Resource Usage**: Monitor CPU and memory usage
4. **Rate Limits**: Check if hitting rate limits

#### Mobile Access Issues
1. **Tailscale Setup**: Verify Tailscale configuration
2. **Network Firewall**: Check firewall settings
3. **SSL Certificates**: Ensure HTTPS setup for production
4. **Browser Compatibility**: Test different mobile browsers

### Performance Optimization

#### Improving Dashboard Performance
- **Enable Caching**: Configure appropriate cache settings
- **Optimize Images**: Compress and optimize images
- **Minimize API Calls**: Reduce unnecessary API requests
- **Use CDN**: Implement CDN for static assets

#### Agent Performance
- **Model Selection**: Choose optimal models for tasks
- **Batch Processing**: Implement batch operations where possible
- **Parallel Processing**: Enable parallel agent execution
- **Resource Monitoring**: Monitor and optimize resource usage

## 🔄 Maintenance

### Regular Tasks

#### Daily Maintenance
- **Check Agent Status**: Verify all agents operational
- **Review Performance**: Monitor response times and success rates
- **Update Agents**: Apply latest agent updates
- **Check Logs**: Review system logs for errors

#### Weekly Maintenance
- **Update Dependencies**: Update npm packages
- **Optimize Performance**: Review and optimize performance
- **Security Updates**: Apply security patches
- **Backup Configuration**: Backup important configurations

#### Monthly Maintenance
- **Cost Analysis**: Review API usage and costs
- **Performance Tuning**: Perform detailed performance analysis
- **System Updates**: Apply system updates
- **Documentation Review**: Update documentation as needed

### Backup and Recovery

#### Configuration Backup
```bash
# Backup configuration files
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
  .env.local \
  lib/config.ts \
  scripts/
```

#### Database Backup
```bash
# PostgreSQL backup
pg_dump controltower > backup-$(date +%Y%m%d).sql

# Restore
psql controltower < backup-20240326.sql
```

## 🚀 Advanced Usage

### Custom Agents

#### Adding New Agents
1. **Create Agent Configuration**: Define agent parameters
2. **Register with Gateway**: Add agent to OpenClaw gateway
3. **Update Dashboard**: Add agent to monitoring
4. **Test Integration**: Verify agent functionality

### Custom Integrations

#### Webhook Support
Configure webhooks for external integrations:
```typescript
// lib/webhooks.ts
export const webhookConfig = {
  slack: {
    url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
    events: ["agent_status_change", "task_completion"]
  }
};
```

#### Custom Metrics
Add custom metrics tracking:
```typescript
// lib/customMetrics.ts
export const customMetrics = {
  customAgentPerformance: {
    label: "Custom Agent Performance",
    type: "gauge",
    description: "Performance metrics for custom agents"
  }
};
```

## 📞 Support

### Getting Help

#### Documentation
- [Main Documentation](README.md)
- [Installation Guide](docs/installation.md)
- [API Reference](docs/api-reference.md)
- [Troubleshooting Guide](docs/troubleshooting.md)

#### Community Support
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Join community discussions
- **Discord Community**: Chat with other users
- **Community Forum**: Browse community forums

#### Professional Support
- **Enterprise Support**: Contact for enterprise-level support
- **Consulting Services**: Available for custom implementations
- **Training Sessions**: Group and individual training available

### Contributing

We welcome contributions! See our [Contributing Guide](docs/CONTRIBUTING.md) for:
- Development setup
- Coding standards
- Testing guidelines
- Documentation requirements

---

**Happy monitoring with OpenClaw Control Tower!** 🚀

*Version 5.5.0*  
*Last Updated: March 26, 2026*